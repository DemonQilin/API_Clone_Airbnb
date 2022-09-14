export const errorHandlerHttp = (res, error) => {
    res.status(error.status || 500).send({
        error: (error.errors && error.errors[0]?.message) || error.message,
        fields: error.fields || undefined
    });
};