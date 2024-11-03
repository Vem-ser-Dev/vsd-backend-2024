"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePetById = exports.updatePetById = exports.getPetById = exports.createPet = exports.listPets = void 0;
const petsService_1 = require("../services/petsService");
const service = new petsService_1.PetsService();
const listPets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pets = yield service.fetchPets();
    res.status(200).json(pets);
});
exports.listPets = listPets;
const createPet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdPet = yield service.createPet(req.body);
    res.status(201).json(createdPet);
});
exports.createPet = createPet;
const getPetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const petId = parseInt(req.params.petId);
    const pet = yield service.getPet(petId);
    res.status(200).json(pet);
});
exports.getPetById = getPetById;
const updatePetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const petId = parseInt(req.params.petId);
    yield service.updatePet(petId, req.body);
    res.status(204).json();
});
exports.updatePetById = updatePetById;
const deletePetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const petId = parseInt(req.params.petId);
    yield service.deletePet(petId);
    res.status(204).json();
});
exports.deletePetById = deletePetById;
