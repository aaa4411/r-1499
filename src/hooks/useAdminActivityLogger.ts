
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

export const useAdminActivityLogger = () => {
  const { user } = useAuth();

  // Log admin activity
  const logAdminActivity = async (action: string, targetType: string, targetId: string, details?: any) => {
    if (!user) return;

    try {
      await supabase
        .from('admin_activity_log')
        .insert({
          admin_id: user.id,
          action,
          target_type: targetType,
          target_id: targetId,
          details
        });
    } catch (error) {
      console.error('Error logging admin activity:', error);
    }
  };

  return {
    logAdminActivity
  };
};
