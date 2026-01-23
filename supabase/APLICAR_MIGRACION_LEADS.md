# Instrucciones para Aplicar Migración de Permisos de Leads

## Problema
El formulario de contacto no puede guardar leads porque la tabla `leads` no tiene permisos para inserts anónimos.

## Solución
Debes ejecutar la migración `003_leads_public_insert.sql` en tu panel de Supabase.

## Pasos:

1. **Ir a Supabase Dashboard:**
   - Abre https://supabase.com/dashboard
   - Selecciona tu proyecto

2. **Ir al SQL Editor:**
   - En el menú lateral, haz clic en "SQL Editor"

3. **Ejecutar la Migración:**
   - Copia el contenido del archivo `supabase/migrations/003_leads_public_insert.sql`
   - Pégalo en el editor SQL
   - Haz clic en "Run" o presiona Ctrl+Enter

4. **Verificar:**
   - Ve a "Authentication" > "Policies"
   - Deberías ver las nuevas políticas para la tabla `leads`

## Alternativa Rápida (Copiar y Pegar):

```sql
-- Enable RLS on leads table
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to insert leads (from contact form)
CREATE POLICY "Allow public insert on leads"
ON leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy: Allow authenticated users to view all leads
CREATE POLICY "Allow authenticated users to view leads"
ON leads
FOR SELECT
TO authenticated
USING (true);

-- Policy: Allow authenticated users to update leads
CREATE POLICY "Allow authenticated users to update leads"
ON leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Allow authenticated users to delete leads
CREATE POLICY "Allow authenticated users to delete leads"
ON leads
FOR DELETE
TO authenticated
USING (true);
```

## Después de ejecutar:
- El formulario de contacto podrá guardar leads
- Los leads aparecerán en `/crm/leads`
- No se requieren más cambios en el código
