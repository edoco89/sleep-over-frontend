import bedService from '@/services/bedService';
import reviewService from '@/services/reviewService';

export default {
    state: {
        beds: [],
        currBed: null,
        place: {},
        filter: {
            byLocation: {},
            sortBy: {
                type: 'rating',
                order: -1
            },
            filterByAmeneties: {
                Accessible: false,
                Wifi: false,
                Pets: false,
                "Children Ok": false,
                "Air Conditioner": false,
                Shampoo: false,
                Parking: false
            },
            filterByInterests: {
                sports : false,
                food : false,
                bars : false,
                chill : false,
                books : false,
                cinema : false,
                theater: false,
                shows: false,
                travel : false,
                music : false,
                outgoing: false,
                outdoors: false
            },
            selectedDate: {
                start: new Date(),
                end: new Date()
            }
        }
    },
    getters: {
        bedsToDisplay: (state) => state.beds,
        getCurrBed: (state) => state.currBed,
        getFilter: (state) => state.filter,
        getPlace: (state) => JSON.parse(JSON.stringify(state.place)),
        getCurrentMapCenter: (state) => state.filter.byLocation,
        getSelectedDate: (state) => state.filter.selectedDate
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
        setFilterByAmenity(state, { amenityTypes }) {
            for (let filter in state.filter.filterByAmeneties) {
                state.filter.filterByAmeneties[filter] = false;
            }
            amenityTypes.forEach(filter => {
                state.filter.filterByAmeneties[filter] = true;
            })
        },
        setPlace(state, { place }) {
            !place?  state.place = {} : state.place = place;
        },
        setFilterByLocation(state, { place }) {
            if (!place) {
                state.filter.byLocation.lat = null;
                state.filter.byLocation.lng = null;
            } else {
            state.filter.byLocation.lat = place.geometry.location.lat;
            state.filter.byLocation.lng = place.geometry.location.lng;
            }
        },
        setFilterByDates(state, { selectedDate }) {
            state.filter.selectedDate.start = selectedDate.start.getTime()
            state.filter.selectedDate.end = selectedDate.end.getTime()
        },
        setFilterByMyLocation(state, { place }) {
            navigator.geolocation.getCurrentPosition(position => {
                state.filter.byLocation.lat = position.coords.latitude,
                    state.filter.byLocation.lng = position.coords.longitude
            });
        },
        setReview(state, { review }) {
            state.currBed.reviews.push(review)
        }
    },
    actions: {
        loadBeds({ commit, state }) {
            return bedService.query(state.filter)
                .then(beds => {
                    commit({ type: 'setBeds', beds })
                })
        },
        //works- set in editor
        getBedById({ commit }, { bedId }) {
            return bedService.getBed(bedId)
                .then(bed => {
                    commit({ type: 'setBed', bed })
                    return bed;
                })
        },
        //works- set in editor
        removeBed(context, { bedId }) {
            return bedService.removeBed(bedId)
                .then(() => {
                    context.commit({ type: 'removeBed', bedId })
                })
        },
        //WORK ON EDITOR FORM
        saveBed({ dispatch }, { bed, user, isNeeded = false }) {
            return bedService.saveBed(bed)
                .then(savedBed => {
                    console.log('saved bed!', savedBed);
                    if (isNeeded) return savedBed
                    return dispatch("checkLogin", { user }).then(() => {
                        return savedBed
                    })
                })
        },
        clearCurrBed({ commit }) {
            commit({ type: 'setBed', bed: null })
        },
        clearCurrBeds({ commit }) {
            commit({ type: 'setBeds', beds: [] })
        },
        addReview({ commit, state }, { review }) {
            commit({ type: 'setReview', review })
            return bedService.addReview(state.currBed.reviews)
        },
        setFilter({ commit, dispatch }, { filter }) {
            commit({ type: 'setFilter', filter })
            return dispatch({ type: 'loadBeds' })
        },
        setFilterByAmenity({ commit }, { amenityTypes }) {
            commit({ type: 'setFilterByAmenity', amenityTypes })
        },
        setFilterByLocation({ commit, dispatch }, { place }) {
            commit({ type: 'setPlace', place })
            commit({ type: 'setFilterByLocation', place })
        },
        setFilterByDates({ commit }, { selectedDate }) {
            commit({ type: 'setFilterByDates', selectedDate })
        },
        setFilterByMyLocation({ commit, dispatch }, { place }) {
            commit({ type: 'setPlace', place })
            commit({ type: 'setFilterByMyLocation', place })
        },
        setPlace({ commit, dispatch }, { place }) {
            commit({ type: 'setPlace', place })
            commit({ type: 'setFilterByLocation', place })
            return dispatch({ type: 'loadBeds' })
        }
    }
}