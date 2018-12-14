'use strict';

var assert = require('assert');
var Exercise = require('../models/excerciseModel');

/**
 * Find all exercises.
 *
 * @returns promise resolving to an array of exercises.
 */
function populateList(query, projection) {
  query = query || {
    status: { $nin: ['Deleted'] }
  };

  return Exercise.find(query, projection);
}

/**
 * Find an exercise given its id.
 * @param id - the id to find.
 * @returns promise resolving to populate.
 */
function populateDetail(id) {
  assert(id, 'id was not provided');

  return Exercise.findById(id);
}

/**
 * Find an exercise given its (unique) key name.
 * @param key - the key to find.
 * @returns promise resolving to populate.
 */
function getExerciseByKey(key) {
  assert(key, 'key was not provided');

  var query = {
    key: key,
    status: { $nin: ['Deleted'] }
  };

  return Exercise.find(query);
}

/**
 * Find an exercise from an id.
 * @param {String} exerciseID exercise mongo ObjectId to retrieve.
 * @param {Object} projection a projection to apply onto the mongo query.
 * @returns promise resolving to an exercise.
 */
function getExercise(exerciseID, projection) {
  assert(exerciseID, 'exerciseId was not provided');
  projection = projection || {};

  return Exercise.findById(exerciseID, projection);
}

/**
 * Retrieve a single exercise, with its versions array containing a single version object.
 * Can, and should be projected to retrieve minimal data (these objects are large)
 * @param {String} [exerciseId] the string ID corresponding to the mongo ObjectId
 * @param {String} [versionId] the string ID corresponding to the mongo ObjectId
 * @param {Object} [projection] a projection to apply onto the mongo query.
 * @returns promise resolving to an exercise with a single version.
 */
function getExerciseAndVersion(exerciseID, versionID, projection) {
  // Assert these aren't falsey. Can be a string of 'null', passed in via an express route, which is explictly handled.
  // Otherwise, these should be valid ObjectIds.
  assert(exerciseID, 'exerciseId was not provided');
  assert(versionID, 'versionId was not provided');
  projection = projection || {};
  var query = {};
  var options = {};

  // If a specific exerciseID wasn't passed, get the first one available.
  if (exerciseID === 'null') {
    options.limit = 1;
  } else {
    query._id = exerciseID;
  }

  // If a specific versionID wasn't passed, get the first one available.
  if (versionID === 'null') {
    projection.versions = { $slice: 1 };
  } else {
    projection.versions = { $elemMatch: { _id: versionID } };
    query.versions = { $elemMatch: { _id: versionID } };
  }

  return Exercise.findOne(query, projection, options);
}


/**
 * Find a version from an id.
 * @param versionID - version id to populate.
 * @param {Object} projection a projection to apply onto the mongo query.
 * @returns promise resolving to a version.
 */
function getVersion(versionID, projection) {
  assert(versionID, 'versionID was not provided');
  projection = projection || {};

  return Exercise.find({
    versions: { $elemMatch: { _id: versionID } }
  }, projection);
}

/**
 * Creates an exercise.
 * @param exercise - exercise object to create.
 * @returns promise resolving to creation of exercise.
 */
function createExercise(exercise) {
  assert(exercise, 'exercise was not provided');

  return Exercise.create(
    exercise
  );
}

/**
 * Updates an exercise.
 * @param model - the populated model to update.
 * @returns promise resolving to the operation.
 */
function update(model) {
  assert(model, 'update - model was not provided');

  return model.save();
}

module.exports = {
  populateList: populateList,
  populateDetail: populateDetail,
  getVersion: getVersion,
  getExerciseByKey: getExerciseByKey,
  getExercise: getExercise,
  getExerciseAndVersion: getExerciseAndVersion,
  createExercise: createExercise,
  update: update
};

