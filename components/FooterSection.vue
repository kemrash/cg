<script setup lang="ts">
import vkIconId from '../assets/img/sprite/Vk.svg';
import youtubeIconId from '../assets/img/sprite/Youtube.svg';
import okIconId from '../assets/img/sprite/Ok.svg';
import telegramIconId from '../assets/img/sprite/Telegram.svg';
import type { FooterLinks } from '~/types/Type';

const links = ref<FooterLinks>([
  {
    icon: `#${vkIconId}`,
    href: '#',
    title: 'Вконтакте'
  },
  {
    icon: `#${youtubeIconId}`,
    href: '#',
    title: 'YouTube'
  },
  {
    icon: `#${okIconId}`,
    href: '#',
    title: 'Одноклассники'
  },
  {
    icon: `#${telegramIconId}`,
    href: '#',
    title: 'Телеграм'
  },
])

const dimensionHtmlStore = useDimensionHtmlStore()

onMounted(() => {
  const element: HTMLElement | null = document.querySelector('.footer')
  if (element) {
    dimensionHtmlStore.footerHeight = element.offsetHeight
  }
})
</script>

<template>
  <footer class="footer">
    <div class="container footer__container">
      <small class="text text_small text_bold footer__text">
        LLC «Мультимедиа Визион»
        <div class="footer__inner">
          <span class="footer__copy">&copy;</span>
          <span class="text text_small footer__desc">Все права защищены</span>
        </div>
      </small>
      <UnorderedList class="footer__list">
        <li v-for="link in links" :key="link.icon" class="footer__item">
          <a :href="link.href" target="_blank" class="footer__link" :aria-label="link.title">
            <svg class="footer__icon">
              <use :xlink:href="link.icon" />
            </svg>
          </a>
        </li>
      </UnorderedList>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: 25px 0 40px;

  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
  }

  &__text,
  &__inner {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 11px;
  }

  &__copy {
    font-size: calc($normal + 2px);
    vertical-align: middle;
  }

  &__desc,
  &__copy {
    color: $white-op-7;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 24px
  }

  &__link {
    display: block;
    font-size: 0;
    -webkit-tap-highlight-color: $transparent;

    &:focus-visible:not(:active) .footer__icon {
      color: $white;
      fill: $melrose;
    }
  }

  &__icon {
    width: 36px;
    height: 36px;
    color: $white-op-8;
    stroke: $white-op-8;
    transition: color .3s ease-in-out, fill .3s ease-in-out;
  }
}

@media (any-hover: hover) {
  .footer {
    &__link {
      &:hover:not(:focus-visible):not(:active) {
        color: $white;
        fill: $melrose;
      }
    }
  }
}

@media (max-width: 767.98px) {
  .footer {
    padding: 25px 0 36px;

    &__container {
      gap: 29px;
    }

    &__text {
      gap: 7px;
    }

    &__inner {
      align-items: center;
      gap: 13px;
    }

    &__copy {
      font-size: $mobail-big;
    }

    &__desc {
      font-size: $mobail-small;
    }

    &__icon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
