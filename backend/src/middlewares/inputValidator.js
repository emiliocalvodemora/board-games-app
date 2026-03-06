import Joi from "joi";

const adminScheme = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const validateAdmin = (req, res, next) => {
    const { error } = adminScheme.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            status: 400,
            message: error.details[0].message });
    }
    next();
};

const playerScheme = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const validatePlayer = (req, res, next) => {
    const { error } = playerScheme.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            status: 400,
            message: error.details[0].message });
    }
    next();
};

const userRegisterScheme = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "player").required()
});

export const validateUserRegister = (req, res, next) => {
    const { error } = userRegisterScheme.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            status: 400,
            message: error.details[0].message });
    }
    next();
};
export const validateUser = (req, res, next) => {
    const { error } = userRegisterScheme.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            status: 400,
            message: error.details[0].message });
    }
    next();
};

const userLoginScheme = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(6).required()
});

export const validateUserLogin = (req, res, next) => {
    const { error } = userLoginScheme.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            status: 400,
            message: error.details[0].message });
    }
    next();
};


const eventScheme = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    event_date: Joi.date().required(),
    event_location: Joi.string().min(3).required(),
    organizer_admin_id: Joi.number().integer().required()
});

export const validateEvent = (req, res, next) => {
    const { error } = eventScheme.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            status: 400,
            message: error.details[0].message });
    }
    next();
}; 

const gameScheme = Joi.object({ 
    name: Joi.string().min(3).required(), 
    description: Joi.string().min(3).required(), 
    minPlayers: Joi.number().integer().required(), 
    maxPlayers: Joi.number().integer().required() 
}); 

export const validateGame = (req, res, next) => { 
    const { error } = gameScheme.validate(req.body); 
    if (error) { 
        return res.status(400).json({ 
            status: 400, 
            message: error.details[0].message }); 
    } 
    next();
};

const matchScheme = Joi.object({ 
    gameId: Joi.number().integer().required(),
    eventId: Joi.number().integer().allow(null),
    startTime: Joi.date().required(),
    endTime: Joi.date().required()
}); 

export const validateMatch = (req, res, next) => { 
    const { error } = matchScheme.validate(req.body); 
    if (error) { 
        return res.status(400).json({ 
            status: 400, 
            message: error.details[0].message }); 
    } 
    next();
};