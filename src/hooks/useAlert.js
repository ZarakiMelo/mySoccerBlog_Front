import { useState, useCallback } from 'react';

const useAlert = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'info',
    action: null
  });

  const showAlert = useCallback(({ message, severity = 'info', action = null }) => {
    setAlert({
      open: true,
      message,
      severity,
      action
    });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(prev => ({
      ...prev,
      open: false
    }));
  }, []);

  return {
    alert,
    showAlert,
    hideAlert
  };
};

export default useAlert; 