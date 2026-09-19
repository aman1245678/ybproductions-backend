import { fakeAsync, tick } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let toast: ToastService;

  beforeEach(() => {
    toast = new ToastService();
  });

  it('pushes success and error toasts onto the signal store', () => {
    const ok = toast.success('Saved');
    const err = toast.error('Failed');
    expect(toast.toasts().map((t) => t.id)).toEqual([ok, err]);
    expect(toast.toasts()[0].type).toBe('success');
    expect(toast.toasts()[1].type).toBe('error');
  });

  it('keeps loading toasts until update or dismiss', fakeAsync(() => {
    const id = toast.loading('Working…');
    expect(toast.toasts().length).toBe(1);
    tick(10_000);
    expect(toast.toasts().length).toBe(1);
    toast.update(id, 'success', 'Done', 1000);
    expect(toast.toasts()[0].type).toBe('success');
    tick(1000);
    expect(toast.toasts().length).toBe(0);
  }));

  it('dismiss removes a toast immediately', () => {
    const id = toast.info('Hello', 0);
    toast.dismiss(id);
    expect(toast.toasts().length).toBe(0);
  });
});
