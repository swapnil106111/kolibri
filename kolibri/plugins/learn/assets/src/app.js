const KolibriModule = require('kolibri_module');
const router = require('router');
const kolibri = require('kolibri');

const rootvue = require('./vue');
const actions = require('./actions');
const store = require('./state/store');
const PageNames = require('./state/constants').PageNames;

class LearnModule extends KolibriModule {
  ready() {
    router.on(
      PageNames.EXPLORE_ROOT,
      '/explore',
      (toRoute, fromRoute) => {
        actions.redirectToExploreChannel(store);
      }
    );

    router.on(
      PageNames.EXPLORE_CHANNEL,
      '/explore/:channel_id',
      (toRoute, fromRoute) => {
        // TODO: Get Root Topic ID from channel List
        actions.showExploreTopic(store, toRoute.params.channel_id, store.state.rootTopicId);
      }
    );

    router.on(
      PageNames.EXPLORE_TOPIC,
      '/explore/:channel_id/topic/:id',
      (toRoute, fromRoute) => {
        actions.showExploreTopic(store, toRoute.params.channel_id, toRoute.params.id);
      }
    );

    router.on(
      PageNames.EXPLORE_CONTENT,
      '/explore/:channel_id/content/:id',
      (toRoute, fromRoute) => {
        actions.showExploreContent(store, toRoute.params.channel_id, toRoute.params.id);
      }
    );

    router.on(
      PageNames.LEARN_ROOT,
      '/learn',
      (toRoute, fromRoute) => {
        actions.redirectToLearnChannel(store);
      }
    );

    router.on(
      PageNames.LEARN_CHANNEL,
      '/learn/:channel_id',
      (toRoute, fromRoute) => {
        actions.showLearnChannel(store, toRoute.params.channel_id);
      }
    );

    router.on(
      PageNames.LEARN_CONTENT,
      '/learn/:channel_id/content/:id',
      (toRoute, fromRoute) => {
        actions.showLearnContent(store, toRoute.params.channel_id, toRoute.params.id);
      }
    );

    router.on(
      PageNames.SCRATCHPAD,
      '/scratchpad',
      (toRoute, fromRoute) => {
        actions.showScratchpad(store);
      }
    );

    router.redirect({
      '/': '/explore',
    });

    router.start(rootvue, 'rootvue');
    kolibri.coreActions.currentLoggedInUser(store, kolibri);
  }
}

module.exports = new LearnModule();
