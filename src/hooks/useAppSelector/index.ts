import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'state/store';

/**
 * Use throughout app instead of plain redux `useSelector` and it correctly infer types for `state`
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
