import bedService from '../services/bedService';

export default {
    state: {
        beds: [],
        currBed: null,
        filter: {
            dateStart: '2018-01-01',
            dateEnd: '2029-12-31',
            byCountry: '',
            byCity: '',
            sortBy: {
                type: 'rating',
                order: -1
            },
            filterByAmeneties: {
                accessibility: false,
                wifi: false,
                acceptsPets: false,
                airConditioner: false,
                shampoo: false,
                parking: false
            }
        }
    },
    getters: {
        bedsToDisplay: (state) => state.beds,
        getCurrBed: (state) => state.currBed,
        getFilterByCountry: (state) => state.filter.byCountry,
        getFilter: (state) => state.filter
    },
    mutations: {
        setBeds(state, { beds }) {
            state.beds = beds
        },
        setBed(state, { bed }) {
            state.currBed = bed;
        },
        setFilter(state, { filter }) {
            state.filter = filter; 
        },
        setFilterByCountry(state, { filterByCountry }) {
            state.filter.byCountry = filterByCountry;
        },
        setFilterByAmenity(state, { amenityFilter }) {
            state.filter.filterByAmeneties[amenityFilter.name] = !amenityFilter.value;
          }
    },
    actions: {
        loadBeds({ commit, state }) {
            return bedService.query(state.filter)
                .then(beds => {
                    commit({ type: 'setBeds', beds })
                })
        },
        getBedById({ commit }, { bedId }) {
            return bedService.getBed(bedId)
                .then(bed => {
                    commit({ type: 'setBed', bed })
                    return bed;
                })
        },
        removeBed(context, { bedId }) {
            return BedService.removeBed(bedId)
                .then(() => {
                    context.commit({ type: 'removeBed', bedId })
                })
        },
        saveBed(context, { bed }) {
            return BedService.saveBed(bed)
                .then(savedBed => {
                    context.commit({ type: 'saveBed', bed: savedBed })
                    return savedBed
                })
        },
        setFilte({ commit, dispatch }, { filter }) {
            commit({ type: 'setFilter', filter })
            return dispatch({ type: 'loadBeds' })
        },
        setFilterByCountry({ commit, dispatch }, { filterByCountry }) {
            commit({ type: 'setFilterByCountry', filterByCountry })
            return dispatch({ type: 'loadBeds' })
        },
        setFilterByAmenity({ commit }, { amenityFilter }) {
            commit({ type: 'setFilterByAmenity', amenityFilter })
          }
    }
}