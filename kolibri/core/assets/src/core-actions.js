function kolibriLogin(store, Kolibri, sessionPayload) {
  const SessionResource = Kolibri.resources.SessionResource;
  const sessionModel = SessionResource.createModel(sessionPayload);
  const sessionPromise = sessionModel.save(sessionPayload);
  const UserKinds = require('./constants').UserKinds;
  sessionPromise.then((session) => {
    store.dispatch('CORE_SET_SESSION', session);
    if (session.kind.includes(UserKinds.ADMIN) || session.kind === UserKinds.SUPERUSER) {
      store.dispatch('SET_ADMIN_STATUS', true);
    }
  }).catch((error) => {
    // hack to handle invalid credentials
    if (error.status.code === 401) {
      store.dispatch('HANDLE_WRONG_CREDS', { kind: 'ANONYMOUS', error: '401' });
    } else {
      store.dispatch('CORE_SET_ERROR', JSON.stringify(error, null, '\t'));
    }
  });
}

function kolibriLogout(store, Kolibri) {
  const SessionResource = Kolibri.resources.SessionResource;
  const id = 'current';
  const sessionModel = SessionResource.getModel(id);
  const logoutPromise = sessionModel.delete(id);
  logoutPromise.then((response) => {
    store.dispatch('CORE_CLEAR_SESSION');
  }).catch((error) => {
    store.dispatch('CORE_SET_ERROR', JSON.stringify(error, null, '\t'));
  });
}

function currentLoggedInUser(store, Kolibri) {
  const SessionResource = Kolibri.resources.SessionResource;
  const id = 'current';
  const sessionModel = SessionResource.getModel(id);
  const sessionPromise = sessionModel.fetch();
  const UserKinds = require('./constants').UserKinds;
  sessionPromise.then((session) => {
    if (session.kind.includes(UserKinds.ADMIN) || session.kind === UserKinds.SUPERUSER) {
      store.dispatch('SET_ADMIN_STATUS', true);
    }
    store.dispatch('CORE_SET_SESSION', session);
  }).catch((error) => {
    store.dispatch('CORE_SET_ERROR', JSON.stringify(error, null, '\t'));
  });
}

function togglemodal(store, bool) {
  store.dispatch('SET_MODAL_STATE', bool);
  if (!bool) {
    // Clears the store to clear any error message from login modal
    store.dispatch('CORE_CLEAR_SESSION');
  }
}

module.exports = {
  kolibriLogin,
  kolibriLogout,
  currentLoggedInUser,
  togglemodal,
};
