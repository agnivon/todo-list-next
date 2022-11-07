import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed',
}

export interface FilterState {
    status: string
    colors: string[]
}

const initialState: FilterState = {
    status: StatusFilters.All,
    colors: [],
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        statusFilterChanged(state, action) {
            state.status = action.payload
        },
        colorFilterChanged: {
            reducer(state, action: PayloadAction<{ color: string, changeType: string }>) {
                let { color, changeType } = action.payload
                const { colors } = state
                switch (changeType) {
                    case 'added': {
                        if (!colors.includes(color)) {
                            colors.push(color)
                        }
                        break
                    }
                    case 'removed': {
                        state.colors = colors.filter(
                            (existingColor) => existingColor !== color
                        )
                    }
                    default:
                        return
                }
            },
            prepare(color: string, changeType: string) {
                return {
                    payload: { color, changeType },
                }
            },
        },
    },
})

export const { colorFilterChanged, statusFilterChanged } = filtersSlice.actions

export const statusFilterSelector = (state: RootState) => state.filters.status;
export const colorFilterSelector = (state: RootState) => state.filters.colors;

export default filtersSlice.reducer
