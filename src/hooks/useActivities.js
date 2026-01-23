import { useState, useCallback } from 'react';
import { supabase } from '../supabaseClient';

export const useActivities = (relationType, relationId) => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchActivities = useCallback(async () => {
        if (!relationType || !relationId) return;

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('activities')
                .select(`
                    *,
                    user:usuario_id (nombre_completo, avatar_url)
                `)
                .eq('relacionado_con', relationType)
                .eq('relacionado_id', relationId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setActivities(data || []);
        } catch (error) {
            console.error('Error fetching activities:', error);
        } finally {
            setLoading(false);
        }
    }, [relationType, relationId]);

    const logActivity = async ({ type, title, description, metadata = {} }) => {
        if (!relationType || !relationId) return null;

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('No user logged in');

            const { data, error } = await supabase
                .from('activities')
                .insert([{
                    tipo: type, // 'nota', 'llamada', 'email', 'cambio_estado', 'creacion'
                    titulo: title,
                    descripcion: description,
                    relacionado_con: relationType,
                    relacionado_id: relationId,
                    usuario_id: user.id,
                    metadata: metadata
                }])
                .select()
                .single();

            if (error) throw error;

            // Refresh activities
            fetchActivities();
            return data;
        } catch (error) {
            console.error('Error logging activity:', error);
            return null;
        }
    };

    return {
        activities,
        loading,
        fetchActivities,
        logActivity
    };
};
