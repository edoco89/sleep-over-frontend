import bedService from '../services/bedService';

export default {
    state: {
        // beds: []
        currBed: null
    },
    getters: {
        bedsToDisplay:(state) => state.beds,
        getCurrBed: (state) => state.currBed
    },
    mutations: {
        setBeds(state, { beds }) {
            state.beds = beds
        },
        setBed(state, { bed }) {
            state.currBed = bed;
        },
    },
    actions: {
        loadBeds({ commit }) {
            return bedService.query()
                .then(beds => {
                    console.log({ beds })
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

                    const activity = {
                        txt: 'Removed the Bed',
                        at: Date.now(),
                        bedTxt: ''
                    }
                    context.commit({ type: 'addActivity', activity })
                })
        },
        saveBed(context, { bed }) {
            return BedService.saveBed(bed)
                .then(savedBed => {
                    const activity = {
                        txt: (bed.id) ? 'Bed Updated' : 'Added a Bed',
                        at: Date.now(),
                        bedTxt: bed.txt
                    }
                    context.commit({ type: 'addActivity', activity })
                    context.commit({ type: 'saveBed', bed: savedBed })
                    return savedBed
                })
        },
    }
}