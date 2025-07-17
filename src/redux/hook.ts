import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from './Store/Store'

export const useappSelector = useSelector.withTypes<RootState>()
export const useappDispacth = useDispatch.withTypes<AppDispatch>()