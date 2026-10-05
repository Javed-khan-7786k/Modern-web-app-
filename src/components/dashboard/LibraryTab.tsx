import React, { useState } from 'react';
import { BookOpen, Search, CheckCircle2, BookmarkCheck } from 'lucide-react';
import { LibraryBook } from '../../types/index.js';
import { Button } from '../common/Button.js';

interface LibraryTabProps {
  books: LibraryBook[];
  onCheckoutBook: (bookId: string) => Promise<void>;
}

export const LibraryTab: React.FC<LibraryTabProps> = ({ books, onCheckoutBook }) => {
  const [search, setSearch] = useState('');
  const [checkingOutId, setCheckingOutId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filtered = books.filter(b => {
    if (search) {
      const q = search.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.includes(q);
    }
    return true;
  });

  const handleCheckout = async (id: string) => {
    setCheckingOutId(id);
    try {
      await onCheckoutBook(id);
      setToastMessage('Book copy successfully issued and logged in catalog');
      setTimeout(() => setToastMessage(null), 3500);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setCheckingOutId(null);
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="p-4 rounded-xl bg-slate-900 text-white text-xs flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>Academic Library & Repository</span>
            <span>·</span>
            <span className="text-slate-900 font-medium">{books.length} Cataloged Titles</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Library Catalog & Book Circulation
          </h2>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search title, author, ISBN..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-slate-400 focus:bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-medium font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Title & Author</th>
                <th className="py-3 px-4">ISBN</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-center">Available</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
              {filtered.map(book => (
                <tr key={book.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900 leading-tight">{book.title}</p>
                    <p className="text-[11px] text-slate-400">{book.author}</p>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500">{book.isbn}</td>
                  <td className="py-3 px-4">{book.category}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{book.shelfLocation}</td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums font-semibold">
                    <span className={book.availableCopies > 0 ? 'text-emerald-700' : 'text-rose-600'}>
                      {book.availableCopies}
                    </span>
                    <span className="text-slate-400"> / {book.totalCopies}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={book.availableCopies <= 0}
                      isLoading={checkingOutId === book.id}
                      onClick={() => handleCheckout(book.id)}
                    >
                      {book.availableCopies > 0 ? 'Issue Copy' : 'Out of Stock'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
