/**
 * 画面タッチキーボードの表示状態(モバイル対応)。
 *
 * 物理キーボードを持たない端末(スマホ/タブレット)では打鍵(a-z/-)を入力する手段が無いため、
 * バトル画面に画面キーボードを重ねて表示する。既定は pointer:coarse(タッチ主体の入力)の
 * 端末で自動オン。ユーザーがトグルボタンで明示的に上書きした場合はその値を localStorage に
 * 永続し、以後は自動判定より優先する(sound.svelte.ts のミュート永続化と同じパターン)。
 */

const STORAGE_KEY = 'magic:touch-keyboard';

/** タッチ主体の入力デバイスかどうかの目安(既定値の算出にのみ使う)。 */
function detectCoarsePointer(): boolean {
  return window.matchMedia('(pointer: coarse)').matches;
}

/** ユーザーが明示的に上書きした値。未設定・壊れ・例外時は null(=自動判定に従う)。 */
function loadOverride(): boolean | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === '1') return true;
    if (raw === '0') return false;
    return null;
  } catch {
    return null;
  }
}

function saveOverride(value: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, value ? '1' : '0');
  } catch {
    // 保存できなくても表示切替自体には影響しないため無視する。
  }
}

// 表示の正はこの $state。getter/toggle 経由で参照箇所がリアクティブに追従する
// (router.svelte.ts / sound.svelte.ts と同型)。
let visible = $state<boolean>(loadOverride() ?? detectCoarsePointer());

export function isTouchKeyboardVisible(): boolean {
  return visible;
}

/** トグルボタンから呼ぶ。以後はこの値が自動判定より優先される。 */
export function toggleTouchKeyboard(): void {
  visible = !visible;
  saveOverride(visible);
}
