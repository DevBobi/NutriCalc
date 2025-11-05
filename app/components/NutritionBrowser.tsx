'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface NutritionPage {
  slug: string;
  title: string;
  quickAnswer: string;
  totalKcal: number;
  imageName: string | null;
  hasImage: boolean;
}

interface Props {
  pages: NutritionPage[];
}

export default function NutritionBrowser({ pages }: Props) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'with-images' | 'no-images'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const itemsPerPage = 24

  // Filter and search logic
  const filteredPages = useMemo(() => {
    return pages.filter(page => {
      const matchesSearch = search === '' || 
        page.title.toLowerCase().includes(search.toLowerCase()) ||
        page.quickAnswer.toLowerCase().includes(search.toLowerCase())
      
      const matchesFilter = filter === 'all' || 
        (filter === 'with-images' && page.hasImage) ||
        (filter === 'no-images' && !page.hasImage)
      
      return matchesSearch && matchesFilter
    })
  }, [pages, search, filter])

  // Pagination logic
  const totalPages = Math.ceil(filteredPages.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPages = filteredPages.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [search, filter])

  const pagesWithImages = pages.filter(p => p.hasImage).length
  const pagesWithoutImages = pages.filter(p => !p.hasImage).length

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6 shadow-soft border border-primary-200 dark:border-primary-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary dark:text-primary">{pages.length}</div>
            <div className="text-sm text-text-secondary dark:text-text-secondary">Total Foods</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary dark:text-secondary">{pagesWithImages}</div>
            <div className="text-sm text-text-secondary dark:text-text-secondary">With Images</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-text-primary dark:text-text-primary">{pagesWithoutImages}</div>
            <div className="text-sm text-text-secondary dark:text-text-secondary">Text Only</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent dark:text-accent">{filteredPages.length}</div>
            <div className="text-sm text-text-secondary dark:text-text-secondary">Showing</div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-surface dark:bg-dark-surface rounded-xl shadow-soft p-6 border border-border dark:border-dark-border">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search foods... (e.g., chicken, burger, apple)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-border dark:border-dark-border bg-surface dark:bg-dark-surface text-text-primary dark:text-dark-text rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary dark:text-text-secondary" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary dark:text-text-secondary hover:text-text-primary dark:hover:text-dark-text"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-primary text-white shadow-soft' 
                  : 'bg-surface dark:bg-dark-surface text-text-secondary dark:text-text-secondary border border-border dark:border-dark-border hover:bg-primary-50 dark:hover:bg-primary/20'
              }`}
            >
              All ({pages.length})
            </button>
            <button
              onClick={() => setFilter('with-images')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                filter === 'with-images' 
                  ? 'bg-secondary text-white shadow-soft' 
                  : 'bg-surface dark:bg-dark-surface text-text-secondary dark:text-text-secondary border border-border dark:border-dark-border hover:bg-secondary-50 dark:hover:bg-secondary/20'
              }`}
            >
              🖼️ Images ({pagesWithImages})
            </button>
            <button
              onClick={() => setFilter('no-images')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                filter === 'no-images' 
                  ? 'bg-accent text-white shadow-soft' 
                  : 'bg-surface dark:bg-dark-surface text-text-secondary dark:text-text-secondary border border-border dark:border-dark-border hover:bg-accent-50 dark:hover:bg-accent/20'
              }`}
            >
              📄 Text ({pagesWithoutImages})
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'bg-surface dark:bg-dark-surface text-text-secondary dark:text-text-secondary border border-border dark:border-dark-border hover:bg-primary-50 dark:hover:bg-primary/20'
              }`}
              title="Grid view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'bg-surface dark:bg-dark-surface text-text-secondary dark:text-text-secondary border border-border dark:border-dark-border hover:bg-primary-50 dark:hover:bg-primary/20'
              }`}
              title="List view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-text-secondary dark:text-text-secondary">
          Showing <span className="font-semibold text-text-primary dark:text-dark-text">{startIndex + 1}-{Math.min(endIndex, filteredPages.length)}</span> of <span className="font-semibold text-text-primary dark:text-dark-text">{filteredPages.length}</span> foods
        </p>
        <p className="text-sm text-text-secondary dark:text-text-secondary">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Results Grid/List */}
      {currentPages.length > 0 ? (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {currentPages.map((page) => (
                <Link 
                  key={page.slug}
                  href={`/calories-in/${page.slug}`}
                  className="group bg-surface dark:bg-dark-surface rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden border border-border dark:border-dark-border hover:border-primary dark:hover:border-primary"
                >
                  {page.imageName ? (
                    <div className="relative h-32 w-full overflow-hidden bg-gray-100">
                      <Image
                        src={`/images/nutrition/${page.imageName}`}
                        alt={page.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute top-2 right-2 bg-surface/95 dark:bg-dark-surface/95 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-xs font-bold text-secondary dark:text-secondary">
                          {page.totalKcal}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-32 w-full bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-2xl font-bold text-secondary dark:text-secondary mb-1">
                          {page.totalKcal}
                        </div>
                        <div className="text-xs text-text-secondary dark:text-text-secondary">kcal</div>
                      </div>
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="text-xs font-medium text-text-primary dark:text-dark-text line-clamp-2 group-hover:text-primary dark:group-hover:text-primary transition-colors leading-tight">
                      {page.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-surface dark:bg-dark-surface rounded-xl shadow-soft border border-border dark:border-dark-border overflow-hidden">
              <div className="divide-y divide-border dark:divide-dark-border">
                {currentPages.map((page) => (
                  <Link 
                    key={page.slug}
                    href={`/calories-in/${page.slug}`}
                    className="flex items-center gap-4 p-4 hover:bg-primary-50 dark:hover:bg-primary/20 transition-colors group"
                  >
                    {page.imageName ? (
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={`/images/nutrition/${page.imageName}`}
                          alt={page.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-16 flex-shrink-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-secondary dark:text-secondary">{page.totalKcal}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary dark:text-dark-text group-hover:text-primary dark:group-hover:text-primary transition-colors">
                        {page.title}
                      </h3>
                      <p className="text-sm text-text-secondary dark:text-text-secondary line-clamp-1">
                        {page.quickAnswer}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="text-right">
                        <div className="text-lg font-bold text-secondary dark:text-secondary">{page.totalKcal}</div>
                        <div className="text-xs text-text-secondary dark:text-text-secondary">kcal</div>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-text-secondary dark:text-text-secondary group-hover:text-primary dark:group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg font-medium bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-text-primary dark:text-dark-text hover:bg-primary-50 dark:hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {/* First page */}
                {currentPage > 3 && (
                  <>
                    <button
                      onClick={() => setCurrentPage(1)}
                      className="px-4 py-2 rounded-lg font-medium bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-text-primary dark:text-dark-text hover:bg-primary-50 dark:hover:bg-primary/20 transition-all"
                    >
                      1
                    </button>
                    {currentPage > 4 && <span className="px-2 py-2 text-text-secondary dark:text-text-secondary">...</span>}
                  </>
                )}
                
                {/* Pages around current */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => page >= currentPage - 2 && page <= currentPage + 2)
                  .map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        page === currentPage
                          ? 'bg-primary text-white shadow-soft'
                          : 'bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-text-primary dark:text-dark-text hover:bg-primary-50 dark:hover:bg-primary/20'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                
                {/* Last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && <span className="px-2 py-2 text-text-secondary dark:text-text-secondary">...</span>}
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-4 py-2 rounded-lg font-medium bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-text-primary dark:text-dark-text hover:bg-primary-50 dark:hover:bg-primary/20 transition-all"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg font-medium bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-text-primary dark:text-dark-text hover:bg-primary-50 dark:hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-primary-50 dark:bg-primary-900/20 rounded-xl border-2 border-dashed border-primary-200 dark:border-primary-800">
          <svg className="w-16 h-16 text-text-secondary dark:text-text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text mb-2">No foods found</h3>
          <p className="text-text-secondary dark:text-text-secondary mb-4">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearch('')
              setFilter('all')
            }}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors shadow-soft"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}

