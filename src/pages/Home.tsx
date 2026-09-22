import { useMemo, useState } from 'react';
import { Container } from '@/lib/ui/Container';
import { Input } from '@/lib/ui/Input';
import { Badge } from '@/lib/ui/Badge';
import { Button } from '@/lib/ui/Button';
import { CenteredSpinner } from '@/lib/ui/Spinner';
import { Alert, AlertTitle, AlertDescription } from '@/lib/ui/Alert';
import { EmptyState } from '@/lib/ui/EmptyState';
import { ApiResultCard } from '@/components/ApiResultCard';
import { Search, SearchX, KeyRound, Unlock, ShieldCheck } from 'lucide-react';
import { useAppData } from '@/lib/data';
import { MOCK_ENTRIES, type ApiEntry } from '@/lib/mockEntries';

export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [authFilter, setAuthFilter] = useState<'all' | 'none' | 'apiKey' | 'OAuth'>('all');

  const { data, isLoading, error, refetch } = useAppData<ApiEntry[]>({
    key: 'public-apis-entries',
    mock: MOCK_ENTRIES,
    fetchLive: async () => {
      throw new Error('not wired yet');
    },
  });

  const categories = useMemo(() => {
    const set = new Set<string>((data ?? []).map((e) => e.Category));
    return ['All', ...Array.from(set).sort()];
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    return data.filter((e) => {
      const matchesQuery =
        q === '' ||
        e.API.toLowerCase().includes(q) ||
        e.Description.toLowerCase().includes(q) ||
        e.Category.toLowerCase().includes(q);
      const matchesCategory = category === 'All' || e.Category === category;
      const normalizedAuth = e.Auth === '' ? 'none' : e.Auth;
      const matchesAuth = authFilter === 'all' || normalizedAuth === authFilter;
      return matchesQuery && matchesCategory && matchesAuth;
    });
  }, [data, query, category, authFilter]);

  return (
    <Container>
      <div className="mb-8 max-w-2xl">
        <h1 className="text-display text-foreground">Do I need an API key for that?</h1>
        <p className="mt-3 text-body text-muted-foreground">
          Search the free, no-auth Public APIs directory and instantly see each API's real auth
          requirement, HTTPS support, and CORS status — so you can pick integrations that don't
          need a key.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            className="pl-9"
            placeholder="Search by name, keyword, or category (e.g. weather, crypto, dogs)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 rounded-md border border-border bg-surface px-3 text-body text-foreground outline-none transition-colors duration-150 ease-out focus:border-primary sm:w-56"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-small text-muted-foreground">Auth type:</span>
        <Button variant={authFilter === 'all' ? 'secondary' : 'ghost'} size="sm" onClick={() => setAuthFilter('all')}>
          All
        </Button>
        <Button
          variant={authFilter === 'none' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setAuthFilter('none')}
        >
          <Unlock size={14} />
          No key
        </Button>
        <Button
          variant={authFilter === 'apiKey' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setAuthFilter('apiKey')}
        >
          <KeyRound size={14} />
          API key
        </Button>
        <Button
          variant={authFilter === 'OAuth' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setAuthFilter('OAuth')}
        >
          <ShieldCheck size={14} />
          OAuth
        </Button>
        {data && (
          <Badge variant="outline" className="ml-auto">
            {filtered.length} of {data.length} APIs
          </Badge>
        )}
      </div>

      {isLoading ? (
        <CenteredSpinner label="Loading Public APIs directory" />
      ) : error ? (
        <Alert variant="destructive">
          <AlertTitle>Couldn't load the Public APIs directory</AlertTitle>
          <AlertDescription className="flex flex-col gap-3">
            <span>{(error as Error).message}</span>
            <Button size="sm" variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<SearchX size={40} />}
          title="No matching APIs"
          description="Try a different keyword, category, or auth filter."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((entry) => (
            <ApiResultCard key={entry.Link} entry={entry} />
          ))}
        </div>
      )}
    </Container>
  );
}
