import { validarConfig } from '../../engine/tipos.js';
import config from './eca-digital.json';

// Guarda: o álbum real precisa passar na validação do motor (RF-03/04).
describe('config eca-digital.json', () => {
  it('passa na validação do motor sem problemas', () => {
    expect(validarConfig(config)).toEqual([]);
  });
});
