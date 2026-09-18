import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let logger: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    logger = TestBed.inject(LoggerService);
  });

  it('writes a JSON info line', () => {
    const spy = spyOn(console, 'info');
    logger.info('application.submit', { formType: 'BRANDING' });
    expect(spy).toHaveBeenCalled();
    const line = spy.calls.mostRecent().args[0] as string;
    const parsed = JSON.parse(line);
    expect(parsed.level).toBe('info');
    expect(parsed.message).toBe('application.submit');
    expect(parsed.context.formType).toBe('BRANDING');
  });
});
