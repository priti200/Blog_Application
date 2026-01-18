import { useState } from 'react';
import Layout from './components/layout/Layout';
import Sidebar from './components/layout/Sidebar';
import FeaturedBlog from './components/blog/FeaturedBlog';
import BlogForm from './components/blog/BlogForm';
import { useBlogs } from './hooks/useBlogs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Plus, ArrowLeft } from 'lucide-react';

type View = 'blog' | 'create';

function App() {
  const { data: blogs = [], isLoading, error } = useBlogs();
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [view, setView] = useState<View>('blog');

  const navigateToHome = () => {
    setSelectedBlogId(null);
    setView('blog');
  };

  const handleBlogClick = (id: number) => {
    setSelectedBlogId(id);
    setView('blog');
  };

  const handleProfileClick = () => {
    setView('create');
  };

  const handleBlogCreated = () => {
    setView('blog');
    setSelectedBlogId(null);
    alert('Blog post created successfully!');
  };

  // Get the selected blog or default to the first blog
  const displayedBlog = selectedBlogId
    ? blogs.find(b => b.id === selectedBlogId) || blogs[0]
    : blogs[0];

  if (isLoading) {
    return (
      <Layout onLogoClick={navigateToHome} onProfileClick={handleProfileClick}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-600">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout onLogoClick={navigateToHome} onProfileClick={handleProfileClick}>
        <div className="flex items-center justify-center min-h-screen p-6">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Error loading blogs. Please try again later.</AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout onLogoClick={navigateToHome} onProfileClick={handleProfileClick}>
      {view === 'create' ? (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => setView('blog')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Button>
          </div>
          <BlogForm onSuccess={handleBlogCreated} onCancel={() => setView('blog')} />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              CA Monk Blog
            </h1>
            <p className="text-lg text-gray-600">
              Stay updated with the latest trends in finance, accounting, and career
              <br />
              growth
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-4">
              <Sidebar blogs={blogs} onBlogClick={handleBlogClick} />
            </aside>

            <main className="lg:col-span-8">
              {displayedBlog ? (
                <FeaturedBlog blog={displayedBlog} onBack={navigateToHome} />
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-gray-600">No blogs available</p>
                </div>
              )}
            </main>
          </div>

          <Button
            onClick={() => setView('create')}
            size="icon"
            className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-all"
            title="Create New Blog"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      )}
    </Layout>
  );
}

export default App;
