/**
 * VoteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const _ = require('lodash');

module.exports = {
  vote: (req, res, next) => {
    let data = req.body || req.query;
    if (
      !data.project ||
            typeof data.idea === undefined ||
            typeof data.art === undefined ||
            typeof data.mechanics === undefined ||
            typeof data.realization === undefined ||
            data.idea === null ||
            data.art === null ||
            data.mechanics === null ||
            data.realization === null
    ) {
      return res.badRequest('Wrong data');
    }
    Project.findOne({id: data.project})
            .then(foundProject => {
              if (!foundProject) {
                return res.badRequest('Wrong project');
              }
              return Vote.findOne({project: data.project, user: req.userId});
            })
            .then(foundVote => {
              if (foundVote) {
                return res.badRequest('Already voted');
              }
              return Vote.create({
                project: data.project,
                user: req.userId,
                idea: data.idea,
                art: data.art,
                mechanics: data.mechanics,
                realization: data.realization,
              });
            })
            .then(created => {
              return Project.findOne({id: data.project}).populate('votings');
            })
            .then(foundProject => {
              let userVotings = [];
              foundProject.votings.forEach(vote => {
                if (vote.user === req.userId) {userVotings.push(vote);}
              });
              foundProject.votings = userVotings;
              return res.json(foundProject);
            })
            .catch(err => {
              return res.serverError(err);
            });
  },
};
