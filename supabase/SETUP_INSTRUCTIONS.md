# Instrucciones: Ejecutar Schema de CRM en Supabase

## Paso 1: Acceder a Supabase
1. Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto `amc-agency-web`
3. En el menú lateral, haz clic en **SQL Editor**

## Paso 2: Ejecutar el Script
1. Haz clic en **New Query**
2. Abre el archivo: `supabase/migrations/001_crm_schema.sql`
3. Copia TODO el contenido del archivo
4. Pégalo en el editor SQL de Supabase
5. Haz clic en **Run** (botón verde abajo a la derecha)

## Paso 3: Verificar
Deberías ver un mensaje de éxito. Luego verifica que se crearon las tablas:
1. Ve a **Table Editor** en el menú lateral
2. Deberías ver las nuevas tablas:
   - `leads`
   - `deals`
   - `tasks`
   - `activities`
   - `projects`
   - `documents`
   - `user_profiles`

## Paso 4: Crear tu perfil de usuario
Ejecuta este query adicional (reemplaza `TU-EMAIL` con el email que usas para login):

```sql
INSERT INTO user_profiles (id, nombre_completo, rol)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'TU-EMAIL-AQUI@gmail.com';
```

## ¿Listo?
Una vez ejecutado, avísame y continuamos con el frontend del CRM.
