import { ref } from 'vue';

export const usePromiseWithLoading = (defaultValue = true) => {
  const isLoading = ref(defaultValue);

  const withLoading = <T>(promise: Promise<T>) => {
    isLoading.value = true;

    promise.finally(() => {
      isLoading.value = false;
    });

    return promise;
  };

  return { isLoading, withLoading };
};
