import Sequelize from "sequelize";

export const errorHandlerHttp = (res, error) => {
    if (error instanceof Sequelize.BaseError) error.status = 400;

    res.status(error.status || 500).send({
        error: (error.errors && error.errors[0]?.message) || error.message,
        fields: error.fields || undefined
    });
};