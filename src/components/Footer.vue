<template>
  <div class="footer">
    <div class="footer_block w-container">
      <div class="logo_footer w-clearfix">
        <div class="footer_logo_text">
          Dragon ZIL
        </div>
      </div>
      <div
        class="footer_links_block"
      >
        <a
          href="https://t.me/joinchat/DEnpkgr31xVjG4io-wmwLQ"
          class="footer_link"
        >
          Ask a question
        </a>
        <a
          href="https://dragoneth.com/privacy"
          class="footer_link"
          target="_blank"
        >
          Privacy policy
        </a>
        <a
          href="https://dragoneth.com/terms"
          class="footer_link"
          target="_blank"
        >
          Terms of service
        </a>
        <a
          href="https://viewblock.io/zilliqa/address/zil15ks9t9ve0fp3de06w0aaum3yqz9a39jnzgalet?network=mainnet&tab=code"
          class="footer_link"
          target="_blank"
        >
          Contract CrowdSale
        </a>
        <a
          href="https://viewblock.io/zilliqa/address/zil1qvjkueduc4rvpa78y6devycsfhsyl3c5x6dqst?network=mainnet&tab=code"
          class="footer_link"
          target="_blank"
        >
          Contract Fight
        </a>
        <a
          href="https://viewblock.io/zilliqa/address/zil1apmtzy4x9729fp8du8euehttptr08yuzamfy9f"
          class="footer_link"
          target="_blank"
        >
          Contract DragonZIL
        </a>
      </div>
      <div class="div-block-3">
        <div class="social_links">
          <a
            href="https://www.facebook.com/ethdragons"
            class="social facebook w-inline-block"
            target="_blank"
            title="Facebook"
          />
          <a
            href="https://twitter.com/dragons_eth"
            class="social twitter w-inline-block"
            target="_blank"
            title="Twitter"
          />
          <a
            href="https://www.reddit.com/r/DragonsEth/"
            class="social reddit_02 w-inline-block"
            target="_blank"
            title="Reddit"
          />
          <a
            href="https://medium.com/@dragons_eth"
            class="social medium w-inline-block"
            target="_blank"
            title="Medium"
          />
          <a
            href="https://github.com/DeepDragons"
            class="social gitlab w-inline-block"
            target="_blank"
            title="Source code on github"
          />
          <a
            href="https://discord.gg/kHMxad4"
            class="social dicord w-inline-block"
            target="_blank"
            title="Discord"
          />
          <a
            href="tg://join?invite=DEnpkgr31xVjG4io-wmwLQ"
            class="social telegram w-inline-block"
            title="Join Telegram chat"
          />
        </div>
      </div>
      <div class="cr_block">
        <div class="text-block-3">© DragonETH 2018</div>
      </div>
    </div>
  </div>
</template>

<script>
import ZilPayMixin from '@/mixins/zilpay'


export default {
  name: 'Footer',
  mixins: [ZilPayMixin]
}
</script>

<style>

</style>