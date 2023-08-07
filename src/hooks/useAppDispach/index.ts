import { useDispatch } from 'react-redux';
import { AppDispatch } from 'state/store';

/**
 * Use throughout app instead of plain redux `useDispatch` and it correctly infer types for `dispatch`
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
