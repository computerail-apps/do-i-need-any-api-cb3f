import { Card, CardContent } from '@/lib/ui/Card';
import { Badge } from '@/lib/ui/Badge';
import { Button } from '@/lib/ui/Button';
import { AuthBadge } from '@/components/AuthBadge';
import { ExternalLink, Bookmark, BookmarkCheck, Lock, LockOpen } from 'lucide-react';
import type { ApiEntry } from '@/lib/mockEntries';
import { useSavedApis } from '@/lib/savedApisStore';

export function ApiResultCard({ entry }: { entry: ApiEntry }) {
  const { isSaved, addSaved, removeSaved, savedApis } = useSavedApis();
  const saved = isSaved(entry.Link);

  const handleToggleSave = () => {
    if (saved) {
      const existing = savedApis.find((s) => s.api_url === entry.Link);
      if (existing) removeSaved(existing.id);
    } else {
      addSaved({
        api_name: entry.API,
        api_url: entry.Link,
        description: entry.Description,
        auth_type: entry.Auth || 'none',
        category: entry.Category,
        https: entry.HTTPS,
        cors: entry.Cors,
      });
    }
  };

  return (
    <Card className="transition-colors duration-150 ease-out hover:border-muted-foreground/30">
      <CardContent className="flex flex-col gap-3 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-h3 text-foreground">{entry.API}</h3>
              <Badge variant="outline">{entry.Category}</Badge>
            </div>
            <p className="mt-1 text-body text-muted-foreground">{entry.Description}</p>
          </div>
          <Button
            size="sm"
            variant={saved ? 'secondary' : 'primary'}
            onClick={handleToggleSave}
            aria-label={saved ? `Remove ${entry.API} from saved` : `Save ${entry.API}`}
          >
            {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            {saved ? 'Saved' : 'Save'}
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <AuthBadge auth={entry.Auth} />
          <Badge variant={entry.HTTPS ? 'success' : 'destructive'}>
            {entry.HTTPS ? <Lock size={12} className="mr-1" /> : <LockOpen size={12} className="mr-1" />}
            {entry.HTTPS ? 'HTTPS' : 'No HTTPS'}
          </Badge>
          <Badge variant="outline">CORS: {entry.Cors}</Badge>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={() => window.open(entry.Link, '_blank', 'noopener,noreferrer')}
          >
            <ExternalLink size={14} />
            Visit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
