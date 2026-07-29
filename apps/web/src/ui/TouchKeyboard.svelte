<script lang="ts" module>
  // BattleScreen/MatchBattleScreen が --touch-kbd-reserve に使う予約高さと合わせる
  // (このファイル内の .keyboard の高さと同じ値を保つこと)。
  export const TOUCH_KEYBOARD_RESERVE_PX = 184;
</script>

<script lang="ts">
  // 画面タッチキーボード(モバイル対応)。物理キーボードを持たない端末でローマ字(a-z/-)を
  // 打鍵するための代替入力。実際の判定は一切持たず、タップされたキーを onKey で親へ渡すだけの
  // 薄い表示部品(ADR 0002/0006)。カード選択(1〜4)は手札カードの直接タップで足りるため含めない。
  //
  // 配置上の注意: .stage(1920x1080 を transform:scale する基準コンテナ)の外に置くこと。
  // transform を持つ祖先の中に position:fixed の要素を置くと、fixed は viewport ではなく
  // その transform 祖先を基準にしてしまい、スケールに巻き込まれて実タップサイズが崩れる。
  interface Props {
    onKey: (key: string) => void;
  }

  const { onKey }: Props = $props();

  // .stage-viewport 側が予約する高さ(--touch-kbd-reserve)ちょうどにこのバーを合わせ、
  // 隙間(下地の色が透けて見える帯)ができないようにする(呼び出し側と同じ定数を使う契約)。
  const style = `height:${TOUCH_KEYBOARD_RESERVE_PX}px`;

  const ROWS: readonly (readonly string[])[] = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '-'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];

  // タップは onclick で処理する(button 要素なのでソフトウェアキーボードは開かず、
  // preventDefault も不要)。押下と同時に呼ぶだけで判定は親(pressKey)に委ねる。
  function handleTap(key: string): void {
    onKey(key);
  }
</script>

<div class="keyboard" {style} aria-label="タッチキーボード">
  {#each ROWS as row, i (i)}
    <div class="row">
      {#each row as key (key)}
        <button type="button" class="key" onclick={() => handleTap(key)}>{key}</button>
      {/each}
    </div>
  {/each}
</div>

<style>
  .keyboard {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 6px;
    /* 横方向は端末回転時のホームインジケータ(セーフエリア)分もよける。 */
    padding: 8px max(6px, env(safe-area-inset-right)) max(8px, env(safe-area-inset-bottom))
      max(6px, env(safe-area-inset-left));
    background: rgba(18, 14, 34, 0.92);
    border-top: 1px solid var(--border-dim);
  }

  .row {
    display: flex;
    justify-content: center;
    gap: 5px;
  }

  .key {
    flex: 1;
    max-width: 44px;
    min-width: 26px;
    height: 38px;
    box-sizing: border-box;
    border: 1px solid var(--border-card);
    border-radius: 8px;
    background: linear-gradient(180deg, #3a3260, #241d40);
    color: var(--text-heading);
    font-family: var(--font-mono);
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1;
    /* タップ操作向け: 300ms 遅延・ダブルタップズーム・選択・長押しコールアウトを抑止する。 */
    touch-action: manipulation;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  .key:active {
    background: linear-gradient(180deg, var(--purple-grad-start), var(--purple-grad-end));
  }
</style>
