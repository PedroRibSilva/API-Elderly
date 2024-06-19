const mongoose = require('mongoose');

const ConsultaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  data: {
    type: Date,
    required: true,
  },
  descricao: {
    type: String,
  },
});

const Consulta = mongoose.model('Consulta', ConsultaSchema);
module.exports = Consulta;
