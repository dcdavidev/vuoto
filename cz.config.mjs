/**
 * czg commit prompt configuration for Spellbookx.
 * Documentation: https://cz-git.qbb.sh/config/
 */
import { config } from 'cz-config-spellbookx';
import { definePrompt } from 'czg';

export default definePrompt({
  ...config,
});
