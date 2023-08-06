export const localCache = <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    cacheName: string
): T => {
    const cache = localStorage.getItem(cacheName);

    return ((...args: any[]) => {
        if (cache) {
            return Promise.resolve(JSON.parse(cache));
        } else {
            return fn(...args).then((res) => {
                localStorage.setItem(cacheName, JSON.stringify(res));
                return res;
            });
        }
    }) as T;
};
