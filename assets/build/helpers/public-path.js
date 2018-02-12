/* eslint-env browser */
/* globals WPOK_DIST_PATH */

/** Dynamically set absolute public path from current protocol and host */
if (WPOK_DIST_PATH) {
  __webpack_public_path__ = WPOK_DIST_PATH; // eslint-disable-line no-undef, camelcase
}
