import { Badge } from '@/lib/ui/Badge';
import { KeyRound, ShieldCheck, Unlock, UserCircle2 } from 'lucide-react';

export function normalizeAuth(auth: string | null | undefined): string {
  if (!auth || auth.trim() === '') return 'none';
  return auth.trim();
}

export function AuthBadge({ auth }: { auth: string | null | undefined }) {
  const normalized = normalizeAuth(auth);

  if (normalized.toLowerCase() === 'none') {
    return (
      <Badge variant="success">
        <Unlock size={12} className="mr-1" />
        No key
      </Badge>
    );
  }
  if (normalized.toLowerCase() === 'apikey' || normalized.toLowerCase() === 'x-api-key') {
    return (
      <Badge variant="warning">
        <KeyRound size={12} className="mr-1" />
        API key
      </Badge>
    );
  }
  if (normalized.toLowerCase() === 'oauth') {
    return (
      <Badge variant="default">
        <ShieldCheck size={12} className="mr-1" />
        OAuth
      </Badge>
    );
  }
  return (
    <Badge variant="outline">
      <UserCircle2 size={12} className="mr-1" />
      {normalized}
    </Badge>
  );
}
