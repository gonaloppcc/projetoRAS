export const formatNumber = (value: number): string => {
    return value.toFixed(2);
};

export const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString('pt-PT', {
        minute: 'numeric',
        hour: 'numeric',
        weekday: 'long',
    });
