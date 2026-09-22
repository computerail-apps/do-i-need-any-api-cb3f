import { Container } from '@/lib/ui/Container';
import { Card, CardContent } from '@/lib/ui/Card';
import { Badge } from '@/lib/ui/Badge';
import { Button } from '@/lib/ui/Button';
import { CenteredSpinner } from '@/lib/ui/Spinner';
import { Alert, AlertTitle, AlertDescription } from '@/lib/ui/Alert';
import { EmptyState } from '@/lib/ui/EmptyState';
import { AuthBadge } from '@/components/AuthBadge';
import { Bookmark, ExternalLink, Lock, LockOpen, Trash2 } from 'lucide-react';
import { useSavedApis } from '@/lib/savedApisStore';
import { useNavigate } from 'react-router-dom';

function relTime(iso: string): string {
  const s = Math.floor((Date.now() - Date.parse(iso)) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function Saved() {
  const { savedApis, isLoading, error, removeSaved } = useSavedApis();
  const navigate = useNavigate();

  return (
    <Container>
      <div className="mb-8 max-w-2xl">
        <h1 className="text-display text-foreground">Your saved shortlist</h1>
        <p className="mt-3 text-body text-muted-foreground">
          The APIs you've already vetted — auth type, HTTPS, and CORS at a glance, so you never
          have to look them up twice.
        </p>
      </div>

      {isLoading ? (
        <CenteredSpinner label="Loading your shortlist" />
      ) : error ? (
        <Alert variant="destructive">
          <AlertTitle>Couldn't load your saved APIs</AlertTitle>
          <AlertDescription>{(error as Error).message}</AlertDescription>
        </Alert>
      ) : savedApis.length === 0 ? (
        <EmptyState
          icon={<Bookmark size={40} />}
          title="No saved APIs yet"
          description="Search the directory and click Save on any result to build your shortlist."
          action={<Button onClick={() => navigate('/')}>Search APIs</Button>}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {savedApis.map((api) => (
            <Card key={api.id}>
              <CardContent className="flex flex-col gap-3 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-h3 text-foreground">{api.api_name}</h3>
                      {api.category && <Badge variant="outline">{api.category}</Badge>}
                    </div>
                    {api.description && (
                      <p className="mt-1 text-body text-muted-foreground">{api.description}</p>
                    )}
                    <p className="mt-1 text-micro text-muted-foreground">
                      Saved {relTime(api.saved_at)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeSaved(api.id)}
                    aria-label={`Remove ${api.api_name}`}
                  >
                    <Trash2 size={16} />
                    Remove
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <AuthBadge auth={api.auth_type} />
                  <Badge variant={api.https ? 'success' : 'destructive'}>
                    {api.https ? <Lock size={12} className="mr-1" /> : <LockOpen size={12} className="mr-1" />}
                    {api.https ? 'HTTPS' : 'No HTTPS'}
                  </Badge>
                  {api.cors && <Badge variant="outline">CORS: {api.cors}</Badge>}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto"
                    onClick={() => window.open(api.api_url, '_blank', 'noopener,noreferrer')}
                  >
                    <ExternalLink size={14} />
                    Visit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
