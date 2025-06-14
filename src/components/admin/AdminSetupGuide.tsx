
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRoles } from '@/hooks/useAdminRoles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, CheckCircle, AlertTriangle, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const AdminSetupGuide: React.FC = () => {
  const { user } = useAuth();
  const { userRole, isSuperAdmin } = useAdminRoles();
  const [copied, setCopied] = useState(false);

  if (!user || isSuperAdmin()) return null;

  const userId = user.id;
  const sqlCommand = `INSERT INTO public.user_roles (user_id, role) VALUES ('${userId}', 'super_admin') ON CONFLICT (user_id, role) DO NOTHING;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlCommand);
    setCopied(true);
    toast({
      title: "SQL Command Copied",
      description: "The command has been copied to your clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Admin Setup Required
        </CardTitle>
        <CardDescription>
          You need to set up the first super admin to access admin features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Current Role:</strong> {userRole} - You need super admin privileges to manage the platform.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="user-id">Your User ID</Label>
          <div className="flex gap-2">
            <Input id="user-id" value={userId} readOnly className="font-mono text-sm" />
            <Button variant="outline" size="icon" onClick={() => {
              navigator.clipboard.writeText(userId);
              toast({ title: "User ID copied to clipboard" });
            }}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>SQL Command to Execute</Label>
          <div className="relative">
            <div className="bg-gray-900 text-green-400 p-3 rounded-md font-mono text-sm overflow-x-auto">
              {sqlCommand}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-2 right-2"
              onClick={handleCopy}
            >
              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border space-y-3">
          <h4 className="font-semibold text-sm">Setup Instructions:</h4>
          <ol className="text-sm space-y-2 list-decimal list-inside text-gray-600">
            <li>Copy the SQL command above</li>
            <li>Go to your Supabase Dashboard → SQL Editor</li>
            <li>Paste and run the command</li>
            <li>Refresh this page to gain admin access</li>
          </ol>
        </div>

        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            After running this command, you'll have full admin privileges and can manage users, properties, and system settings.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
