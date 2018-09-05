/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const _ = require('lodash');

module.exports = {
  getProjects: (req, res, next) => {
    Project.find()
            .populate('votings')
            .then(found => {
              found.forEach(project => {
                let userVotings = [];
                project.votings.forEach(vote => {
                  if (vote.user === req.userId) {userVotings.push(vote);}
                });
                project.votings = userVotings;
              });

              return res.json(found);
            })
            .catch(err => {
              return res.serverError(err);
            });
  },
};
