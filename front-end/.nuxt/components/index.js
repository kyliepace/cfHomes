export { default as AddressSearch } from '../../components/AddressSearch.vue'
export { default as MyMap } from '../../components/MyMap.vue'

export const LazyAddressSearch = import('../../components/AddressSearch.vue' /* webpackChunkName: "components/AddressSearch" */).then(c => c.default || c)
export const LazyMyMap = import('../../components/MyMap.vue' /* webpackChunkName: "components/MyMap" */).then(c => c.default || c)
