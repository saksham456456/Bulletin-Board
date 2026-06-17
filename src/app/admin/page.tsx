import AdminPanelClient from './AdminPanelClient';
import { supabase } from '@/lib/supabase';
import { Notice } from '@/types';

// Opt out of caching for admin page to ensure fresh data
export const revalidate = 0;

export default async function AdminPage() {
  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading notices in admin:', error);
  }

  const initialNotices = (data || []) as Notice[];

  return <AdminPanelClient initialNotices={initialNotices} />;
}
