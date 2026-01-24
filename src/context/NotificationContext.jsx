import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast'; // Assuming we have react-hot-toast or similar

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load initial notifications
        loadNotifications();

        // Subscribe to real-time changes
        const subscription = supabase
            .channel('public:notifications')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'notifications' },
                (payload) => {
                    handleNewNotification(payload.new);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    // Helper to filter valid notifications for current user
    const handleNewNotification = async (newNotif) => {
        const { data: { user } } = await supabase.auth.getUser();

        // Only add if it belongs to the current user
        if (newNotif.user_id === user?.id) {
            setNotifications(prev => [newNotif, ...prev]);
            setUnreadCount(prev => prev + 1);

            // Show Toast Popup
            toast(newNotif.message, {
                icon: getIconForType(newNotif.type),
                duration: 4000,
            });
        }
    };

    const getIconForType = (type) => {
        switch (type) {
            case 'success': return '✅';
            case 'warning': return '⚠️';
            case 'error': return '❌';
            default: return '📢';
        }
    };

    const loadNotifications = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(20);

            if (error) throw error;

            setNotifications(data || []);
            setUnreadCount((data || []).filter(n => !n.read).length);
        } catch (error) {
            console.error('Error loading notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            const { error } = await supabase
                .from('notifications')
                .update({ read: true })
                .eq('id', id);

            if (error) throw error;

            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, read: true } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error marking notification read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const { error } = await supabase
                .from('notifications')
                .update({ read: true })
                .eq('user_id', user.id)
                .eq('read', false);

            if (error) throw error;

            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking all read:', error);
        }
    };

    // Helper to manually create a notification (e.g. from client side actions)
    const createNotification = async (userId, title, message, type = 'info', link = null) => {
        try {
            // 1. Insert into Database (In-App Notification)
            await supabase.from('notifications').insert({
                user_id: userId,
                title,
                message,
                type,
                link,
                read: false
            });

            // 2. Send Email Notification (Direct Invoke for reliability)
            // Fetch target user email first
            const { data: profile } = await supabase
                .from('user_profiles')
                .select('email')
                .eq('id', userId)
                .single();

            if (profile?.email) {
                await supabase.functions.invoke('send-email', {
                    body: {
                        email: profile.email,
                        subject: `🔔 ${title}`,
                        html: `
                            <h2>${title}</h2>
                            <p>${message}</p>
                            <hr />
                            <a href="https://amcagencyweb.com${link || '/crm'}" style="background:#ec4899;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;display:inline-block;margin-top:10px;">
                                Ver en CRM
                            </a>
                        `
                    }
                });
            }

        } catch (error) {
            console.error('Error creating notification:', error);
        }
    };

    const value = {
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        createNotification
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
