import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const usePageNavigation = () => {
  const navigate = useNavigate();
  const navigatePage = useCallback((route) => {
    navigate(route);
  }, []);

  return navigatePage;
};

export default usePageNavigation;
