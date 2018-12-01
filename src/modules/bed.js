import bedService from '@/services/bedService';

export default {
    state: {
        beds: [],
        currBed: null,
        place: {},
        filter: {
            byLocation: {},
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
        getFilter: (state) => state.filter,
        getPlace: (state) => JSON.parse(JSON.stringify(state.place)),
        getCurrentMapCenter: (state) => state.filter.byLocation
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
        setFilterByAmenity(state, { amenityFilter }) {
            state.filter.filterByAmeneties[amenityFilter.name] = !amenityFilter.value;
        },
        setPlace(state, { place }) {
            state.place = place;
        },
        setFilterByLocation(state, { place }) {
            state.filter.byLocation.lat = place.geometry.location.lat;
            state.filter.byLocation.lng = place.geometry.location.lng;
        },
        setFilterByMyLocation(state, {place}) {
        navigator.geolocation.getCurrentPosition(position => {
            state.filter.byLocation.lat = position.coords.latitude,
            state.filter.byLocation.lng = position.coords.longitude
           });
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
        setFilter({ commit, dispatch }, { filter }) {
            commit({ type: 'setFilter', filter })
            return dispatch({ type: 'loadBeds' })
        },
        setFilterByAmenity({ commit }, { amenityFilter }) {
            commit({ type: 'setFilterByAmenity', amenityFilter })
        },
        setFilterByLocation({ commit, dispatch }, { place }) {
            commit({ type: 'setPlace', place })
            commit({ type: 'setFilterByLocation', place })
        },
        setFilterByMyLocation({ commit, dispatch }, { place }) {
            commit({ type: 'setPlace', place })
            commit({ type: 'setFilterByMyLocation', place })
        },
        setPlace({ commit, dispatch }, { place }) {
            commit({ type: 'setPlace', place })
            commit({ type: 'setFilterByLocation', place })
            return dispatch({ type: 'loadBeds' })
        },
    }
}