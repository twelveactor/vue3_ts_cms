// 本地缓存
class LocalCache {
    setCache(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    getCache(key) {
        const value = window.localStorage.getItem(key);
        if (value) {
            // 转换回字符串
            return JSON.parse(value);
        }
    }
    deleteCache(key) {
        window.localStorage.removeItem(key);
    }
    clearCache() {
        window.localStorage.clear();
    }
}
export default new LocalCache();
//# sourceMappingURL=Cache.js.map