import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // منطق التحقق من المستخدم مؤقتاً
    setLoading(false);
  }, []);

  return { user, loading, isAdmin: true };
}
