import configurestore from '@reduxjs/toolkit';

const store=configurestore({
    reducer:{
        auth : authSlice,
    }
});
export default store    