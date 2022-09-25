import mongoose from 'mongoose';

export const DesafioSchema = new mongoose.Schema(
  {
    dtDesafio: { type: Date },
    status: { type: String },
    dtSolicitacao: Date,
    dtResposta: Date,
    solicitante: { type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' },
    categoria: String,
    jogadores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' }],
    partida: { type: mongoose.Schema.Types.ObjectId, ref: 'Partidas' },
  },
  { timestamps: true, collection: 'desafios' },
);
