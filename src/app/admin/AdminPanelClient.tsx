'use client';

import { useState } from 'react';
import { Notice, NoticeType } from '@/types';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/utils';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const typeConfig = {
  release: { color: '#D94F4F', label: 'Release' },
  update: { color: '#4B8EF0', label: 'Update' },
  bugfix: { color: '#D94F4F', label: 'Bug Fix' },
  roadmap: { color: '#E8C547', label: 'Roadmap' },
  support: { color: '#3DB87A', label: 'Support' },
};

export default function AdminPanelClient({ initialNotices }: { initialNotices: Notice[] }) {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Partial<Notice> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    (n.app_name && n.app_name.toLowerCase().includes(search.toLowerCase()))
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openDrawer = (notice?: Notice) => {
    if (notice) {
      setEditingNotice(notice);
    } else {
      setEditingNotice({
        type: 'release',
        title: '',
        description: '',
        app_name: '',
        version: '',
        date: new Date().toISOString().split('T')[0],
        status: 'published'
      });
    }
    setDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    
    const { error } = await supabase.from('notices').delete().eq('id', id);
    if (!error) {
      setNotices(notices.filter(n => n.id !== id));
      showToast('Notice removed');
    } else {
      alert('Failed to delete');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice) return;
    setIsSaving(true);

    const isNew = !editingNotice.id;
    const payload = { ...editingNotice };
    
    let result;
    if (isNew) {
      result = await supabase.from('notices').insert([payload]).select().single();
    } else {
      result = await supabase.from('notices').update(payload).eq('id', payload.id).select().single();
    }

    if (!result.error && result.data) {
      if (isNew) {
        setNotices([result.data as Notice, ...notices]);
      } else {
        setNotices(notices.map(n => n.id === result.data.id ? result.data as Notice : n));
      }
      setDrawerOpen(false);
      showToast('Pinned to board ✓');
    } else {
      alert('Error saving notice: ' + result.error?.message);
    }
    setIsSaving(false);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-2xl">Bulletin Notices</h1>
        <button 
          onClick={() => openDrawer()}
          className="flex items-center gap-2 bg-accent-blue text-white px-4 py-2 rounded font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> New Notice
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
        <input 
          type="text" 
          placeholder="Search notices..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-surface border border-border rounded pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-accent-blue/50"
        />
      </div>

      {/* List */}
      <div className="bg-surface border border-border rounded overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-secondary">
              <th className="px-4 py-3 font-medium w-8"></th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">App</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredNotices.map(notice => (
              <tr key={notice.id} className="hover:bg-elevated transition-colors">
                <td className="px-4 py-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: typeConfig[notice.type]?.color || '#fff' }}></div>
                </td>
                <td className="px-4 py-3 font-medium">{notice.title}</td>
                <td className="px-4 py-3 text-secondary">{notice.app_name || '-'}</td>
                <td className="px-4 py-3 text-secondary font-mono text-xs">{formatDate(notice.date)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 rounded text-xs ${notice.status === 'published' ? 'bg-accent-green/10 text-accent-green' : 'bg-secondary/10 text-secondary'}`}>
                    {notice.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openDrawer(notice)} className="p-1 text-secondary hover:text-primary mr-2"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(notice.id)} className="p-1 text-secondary hover:text-red-400"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {filteredNotices.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-secondary">No notices found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Slide-in Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[360px] bg-surface border-l border-border z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h2 className="font-display font-medium text-lg">{editingNotice?.id ? 'Edit Notice' : 'New Notice'}</h2>
                <button onClick={() => setDrawerOpen(false)} className="text-secondary hover:text-primary"><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form id="notice-form" onSubmit={handleSave} className="flex flex-col gap-5">
                  
                  {/* Type Selection */}
                  <div>
                    <label className="block text-xs font-mono text-secondary mb-2 uppercase tracking-wider">Type</label>
                    <div className="flex flex-wrap gap-2">
                      {(Object.keys(typeConfig) as NoticeType[]).map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setEditingNotice(prev => ({ ...prev!, type: t }))}
                          className={`px-3 py-1.5 rounded text-xs flex items-center gap-1.5 border transition-all ${
                            editingNotice?.type === t 
                              ? 'border-transparent bg-elevated text-primary shadow-sm' 
                              : 'border-border text-secondary hover:text-primary hover:border-secondary/50'
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: typeConfig[t].color }}></span>
                          {typeConfig[t].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-mono text-secondary mb-2 uppercase tracking-wider">Title *</label>
                    <input 
                      required
                      type="text" 
                      value={editingNotice?.title || ''}
                      onChange={e => setEditingNotice(prev => ({ ...prev!, title: e.target.value }))}
                      className="w-full bg-elevated border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-blue/50"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-mono text-secondary mb-2 uppercase tracking-wider">Description</label>
                    <textarea 
                      rows={3}
                      value={editingNotice?.description || ''}
                      onChange={e => setEditingNotice(prev => ({ ...prev!, description: e.target.value }))}
                      className="w-full bg-elevated border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-blue/50 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* App Name */}
                    <div>
                      <label className="block text-xs font-mono text-secondary mb-2 uppercase tracking-wider">App Name</label>
                      <input 
                        type="text" 
                        value={editingNotice?.app_name || ''}
                        onChange={e => setEditingNotice(prev => ({ ...prev!, app_name: e.target.value }))}
                        className="w-full bg-elevated border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-blue/50"
                      />
                    </div>

                    {/* Version */}
                    <div>
                      <label className="block text-xs font-mono text-secondary mb-2 uppercase tracking-wider">Version</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 1.0.0"
                        value={editingNotice?.version || ''}
                        onChange={e => setEditingNotice(prev => ({ ...prev!, version: e.target.value }))}
                        className="w-full font-mono bg-elevated border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-blue/50"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-mono text-secondary mb-2 uppercase tracking-wider">Date</label>
                    <input 
                      type="date" 
                      value={editingNotice?.date || ''}
                      onChange={e => setEditingNotice(prev => ({ ...prev!, date: e.target.value }))}
                      className="w-full bg-elevated border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-blue/50 [color-scheme:dark]"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-mono text-secondary mb-2 uppercase tracking-wider">Status</label>
                    <div className="flex bg-elevated border border-border rounded p-1">
                      <button
                        type="button"
                        onClick={() => setEditingNotice(prev => ({ ...prev!, status: 'published' }))}
                        className={`flex-1 py-1.5 text-sm rounded ${editingNotice?.status === 'published' ? 'bg-surface shadow-sm text-primary' : 'text-secondary hover:text-primary'}`}
                      >
                        Published
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingNotice(prev => ({ ...prev!, status: 'draft' }))}
                        className={`flex-1 py-1.5 text-sm rounded ${editingNotice?.status === 'draft' ? 'bg-surface shadow-sm text-primary' : 'text-secondary hover:text-primary'}`}
                      >
                        Draft
                      </button>
                    </div>
                  </div>

                </form>
              </div>

              <div className="p-6 border-t border-border flex justify-end gap-3 bg-surface">
                <button 
                  type="button" 
                  onClick={() => setDrawerOpen(false)}
                  className="px-4 py-2 rounded text-sm font-medium text-secondary hover:text-primary hover:bg-elevated transition-colors"
                >
                  Cancel
                </button>
                <button 
                  form="notice-form"
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 rounded text-sm font-medium bg-primary text-base hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {isSaving ? 'Saving...' : 'Pin to Board →'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 bg-accent-green text-base px-4 py-2 rounded shadow-lg font-medium text-sm z-50 flex items-center gap-2"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
