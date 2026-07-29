<script lang="ts">
  import { handleNavClick } from '../../lib/router.svelte';
  import Button from '../../ui/Button.svelte';

  // 対戦(対ボット)の準備画面。操作説明と開始キーの案内のみ(ロジックは Match 側)。
  // 開始操作はスペースキー(Match の window keydown)に加え、タップ操作端末向けに
  // ボタンからも呼べるようにする(モバイル対応)。
  interface Props {
    onStart: () => void;
  }

  const { onStart }: Props = $props();
</script>

<section class="start">
  <h1>対戦(vsボット)</h1>
  <div class="desc">
    <p>自分と相手(ボット)が同時に呪文を詠唱し、HPを削り合います。</p>
    <p>1〜4キーまたはクリック/タップでカードを選択し、お題をタイピングして発動。</p>
    <p>先に相手のHPを0にすれば勝ち。時間切れなら残HPの多い方が勝ちです。</p>
    <p class="note">
      ※
      これは練習用のボット対戦です。人と対戦するには「オンライン対戦」へ。デッキは「デッキ編集」で変更できます。
    </p>
  </div>
  <p class="prompt">スペースキーで開始</p>
  <Button variant="primary" onclick={onStart}>タップして開始</Button>
  <nav class="nav">
    <a class="link" href="/room" onclick={(e) => handleNavClick(e, 'room')}>オンライン対戦</a>
    <a class="link" href="/deck" onclick={(e) => handleNavClick(e, 'deck')}>デッキ編集</a>
    <a class="link" href="/" onclick={(e) => handleNavClick(e, 'home')}>ホームへ戻る</a>
  </nav>
</section>

<style>
  .start {
    text-align: center;
  }

  h1 {
    font-size: 1.8rem;
    color: #333;
  }

  .desc {
    margin: 1.5rem 0;
    color: #555;
    line-height: 1.7;
  }

  .desc p {
    margin: 0.2rem 0;
  }

  .note {
    margin-top: 1rem !important;
    color: #888;
    font-size: 0.9rem;
  }

  .prompt {
    margin-top: 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #1565c0;
  }

  .start :global(.btn) {
    margin-top: 1rem;
  }

  .nav {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }

  .link {
    color: #1565c0;
    text-decoration: underline;
    font-family: sans-serif;
  }
</style>
