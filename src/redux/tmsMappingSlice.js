import { createSlice } from "@reduxjs/toolkit";

const tmsMappingSlice = createSlice({
    name: 'tmsMapping',
    initialState:[
        {'TMS Login':[]},
        {'Navigate to Dashboard':[]},
        {'Filtering':[]},
        {'Origin City':[]},
        {'Orign State':[]},
        {'Origin Zip':[]},
        {'Origin Country':[]},
        {'Destination City':[]},
        {'Destination State':[]},
        {'Destination Zip':[]},
        {'Destination Country':[]},
        {'Stops':[]},
        {'Equipment':[]},
        {'Distance':[]}
    ],
    reducers: {
      addNewMapping: (state, action) => {
        console.log(action.payload);
        
        const { category, screen, newLocation, index, notes } = action.payload;
      
        const categoryEntry = state.find((item) => item[category]);
      console.log('88888888888888888888888888888',{...categoryEntry},categoryEntry[category][index],categoryEntry[category][index].location);
      
      categoryEntry[category][index].location.push(...newLocation);
      categoryEntry[category][index].notes.push(notes);

        // if (categoryEntry) {
        //   const screenEntry = categoryEntry[category][index].find((entry) => entry.screen === screen);
      
        //   if (screenEntry) {
        //     screenEntry.location.push(...newLocation);
        //   } else {
        //     // If the screen doesn't exist, create it with the new location
        //     categoryEntry[category].push({
        //       screen,
        //       image:0,
        //       location: [newLocation],
        //     });
        //     console.log(categoryEntry, newLocation);
            
        //   }
        // } else {
        //   state.push({
        //     [category]: [
        //       {
        //         screen,
        //         location: [newLocation],
        //       },
        //     ],
        //   });
        // }
      },
      addnewEntry:(state, action)=>{
        const { category, screen, image } = action.payload;
        console.log(category, screen, image);
        
        const categoryEntry = state.find((item) => item[category]);
        categoryEntry[category].push({screen, image, location: [], notes: []})
      },
      addNewCategory:(state, action)=>{
        const {name} = action.payload;
        state.push({[name]:[]})
      }
      
      
    }
})

export const {addNewMapping, addnewEntry, addNewCategory} = tmsMappingSlice.actions;

export default tmsMappingSlice.reducer;