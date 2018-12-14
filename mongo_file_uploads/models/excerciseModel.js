var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
  key: { type: String, required: [true, 'An exercise must have a key'] },
  createdDate: { type: Date, default: Date.now },
  creator: String,
  lastModifiedDate: { type: Date, default: Date.now },
  lastModifiedBy: String,
  type: String,
  name: { type: String, required: [true, 'An exercise must have a name'] },
  displayName: String,
  year: Number,
  structure: {
    filename: String,
    filesizeBytes: Number,
    fileId: String,
    aggregationLevel0: [String],
    aggregationLevel1: [String],
    aggregationLevel2: [String],
    geographies: [String],
    currencies: [String],
    fiscalPerimeters: [String],
    segmentsByMethodology: Schema.Types.Mixed
  },
  projectionHorizon: Number,
  startingQuarter: Number,
  approver: String,
  baseScenario: String,
  alternativeScenarios: [String],
  businessUnits: [{
    name: String,
    currency: String,
    macroGeography: String,
    fiscalPerimeter: { type: String, default: null },
    aggregationLevel0: String,
    aggregationLevel1: String,
    aggregationLevel2: String
  }],
  versions: [{
    name: String,
    createdDate: { type: Date, default: Date.now },
    creator: String,
    isSensitivityReleasedToAll: { type: Boolean, default: false },
    departments: { type: [String], default: [] },
    isReleasedToAllDepartments: { type: Boolean, default: false },
    lastModifiedDate: { type: Date, default: Date.now },
    lastModifiedBy: String,
    lastModifiedAction: String,
    lastUpdatedRatios: String,
    status: String,
    statusDescription: String,
    password: String,
    baseScenarioFiles: Schema.Types.Mixed,
    allScenarioFiles: Schema.Types.Mixed,
    alternativeScenarioFiles: Schema.Types.Mixed,
    businessUnits: [Schema.Types.Mixed],
    businessUnitPermissions: [String],
    versionUserPermissions: [String],    
    switchboard: Schema.Types.Mixed,
    dataset: {
      taskId: Schema.Types.ObjectId,
      fileId: Schema.Types.ObjectId,
      lastModifiedDate: { type: Date, default: Date.now },
      fileUploadIds: [Schema.Types.ObjectId],
      calibrate: Boolean,
      scenarios: [String],
      scenarioDetails: [Schema.Types.Mixed]
    },
    copiedFromId: Schema.Types.ObjectId,
    copiedFromDatasetFileId: Schema.Types.ObjectId,
    copiedFromName: { type: String, default: null }
  }],
  permissions: [String],
  status: String,
  copiedFromId: Schema.Types.ObjectId,
  copiedFromName: { type: String, default: null },
  state: String,
  sensitivityValues: [Schema.Types.Mixed],
  scenarios: [Schema.Types.Mixed]
});

module.exports = mongoose.model('exercise', ExerciseSchema, 'excercise');
